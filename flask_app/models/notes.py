from flask_app.config.mysqlconnection import connectToMySQL

class Note:
    def __init__(self, data):
        self.id = data['id']
        self.vote_count = data['vote_count']
        self.content = data['content']
        self.book_ref = data['book_ref']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

@classmethod
def save(cls, data):
    query = "INSERT INTO notes(content, book_ref) VALUES (%(content)s,%(book_ref)s);"
    return connectToMySQL(DB).query_db(query, data)