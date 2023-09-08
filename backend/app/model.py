# # model.py
# from flask_sqlalchemy import SQLAlchemy
#
# db = SQLAlchemy()
#
#
# class ContentInfo(db.Model):
#     __tablename__ = 'content_info'
#
#     page_id = db.Column(db.String(), primary_key=True)
#     block_data = db.Column(db.Text())
#
#
# class ConstructionObject(db.Model):
#     __tablename__ = 'construction_objects'
#
#     name = db.Column(db.String(255), primary_key=True)
#     description = db.Column(db.Text())
#     index_photo_path = db.Column(db.Text())
#     object_photo_path = db.Column(db.Text())
#
#     images = db.relationship('Photo', backref='object')
#
#
# class Photo(db.Model):
#     __tablename__ = 'photos'
#
#     id = db.Column(db.Integer(), primary_key=True)
#     path = db.Column(db.Text())
#     object_name = db.Column(db.String(255), db.ForeignKey('construction_objects.name'))
#     visible = db.Column(db.Boolean(), default=False)
