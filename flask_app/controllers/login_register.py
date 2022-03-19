from flask import render_template, redirect, request, session, flash
from flask_app import app
from flask_app.models.users import User
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


@app.route('/')
def index():
    context = {}
    if 'user_id' in session:
        context = {
            "active_user": User.get_by_id({"id": session['user_id']})
        }
    return render_template("home.html", **context)


@app.route('/login')
def home():
    return render_template("index.html")


@app.route('/logout')
def clear_session():
    session.clear()
    flash("You are logged out. Have a good day!", "logout")
    return redirect('/login')

# =================== Register ===================


@app.route('/user/register', methods=["POST"])
def register():
    # Form validation
    if not User.validate_user(request.form):
        return redirect('/login')
    else:
        print(request.form)
    #  PW hashing
        pw_hash = bcrypt.generate_password_hash(request.form['password'])
        data = {
            "first_name": request.form['first_name'],
            "last_name": request.form['last_name'],
            "email": request.form['email'],
            "password": pw_hash,
        }
        print(data)
        User.save(data)
        flash("Account created! Please login with your credentials.", "success")
        return redirect('/login')
# =============================================

# =================== Login ===================


@app.route('/login/validate', methods=['POST'])
def login():
    user_data = User.get_by_email(request.form)
    users = User.get_all()
    print(users)
    print(user_data)
    if not user_data:
        flash("Email not found.", "email_not_found")
        return redirect('/login')
    if not bcrypt.check_password_hash(user_data["password"], request.form['password']):
        flash("Incorrect password.", "pw")
        return redirect('/login')
    session['user_id'] = user_data["id"]
    return redirect('/login/success')


@app.route('/login/success')
def login_success():
    active_user = User.get_by_id({"id": session['user_id']})
    if active_user == False:
        flash("Something went wrong with the id.", "bad_id")
        return redirect('/login')

    return redirect('/')
# =============================================
