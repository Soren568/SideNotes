from flask import render_template, redirect, request, session, flash, jsonify
from flask_app import app
from flask_app.models.users import User

@app.route('/book/<string:book_id>/view')
def book_page(book_id):
    return render_template("book_page.html")

@app.route('/users/<string:user_id>/view')
def user_page(user_id):
    return render_template("user_page.html")