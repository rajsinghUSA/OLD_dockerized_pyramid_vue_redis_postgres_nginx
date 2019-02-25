import transaction
import datetime

from sqlalchemy import Column, Table, ForeignKey
from sqlalchemy import Integer, Unicode, Date, DateTime, Boolean
from sqlalchemy import event, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import scoped_session, sessionmaker, synonym
from sqlalchemy.orm import relationship, backref, relation
from sqlalchemy.orm import configure_mappers, validates
from zope.sqlalchemy import ZopeTransactionExtension
from pyramid.security import Everyone, Authenticated, Allow

from sqlalchemy import Column, Integer, String
from sqlalchemy.types import DateTime


class BaseModel(object):
    def __json__(self, request=None):
        ## creates and returns a dict object
        props = {}
#        for key in self.__dict__:
#            if not key.startswith(('_', '_sa_')):
#                obj = getattr(self, key)
        for key in self.__table__.columns:
            if not key.name.startswith(('_', '_sa_')):
                obj = getattr(self, key.name)
                if isinstance(obj, datetime.datewhich):
                    props[key.name] = obj.isoformat()
                else:
                    props[key.name] = obj
        return props


DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base(cls=BaseModel)


class Signups(Base):
    """
    Example Signups table
    """
    __tablename__ = 'signups'
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    email = Column(String(256), unique=True)
    date_signed_up = Column(DateTime())


##########################################
def initialize_sql(engine):             ##
    DBSession.configure(bind=engine)    ##
    Base.metadata.bind = engine         ##
    Base.metadata.create_all(engine)    ##
##########################################




class User(Base):
    __tablename__   = 'users'
    id              = Column(Integer, primary_key=True)
    title           = Column(Unicode(255))
    first_name      = Column(Unicode(255))
    middle_names    = Column(Unicode(255))
    last_name       = Column(Unicode(255))
    email           = Column(Unicode(255), unique=True, nullable=False)
    username        = Column(Unicode(255))
    sex             = Column(Integer, default=0)
    dob             = Column(Date)
    marital_status  = Column(Unicode(255))
    currenttown     = Column(Unicode(255))
    hometown        = Column(Unicode(255))
    tz              = Column(Unicode(255), nullable=False)
    join_date       = Column(DateTime, default=datetime.datetime.utcnow)

    confirm_status  = Column(Integer, nullable=False)
    _confirm_code   = Column(Unicode(16))
    _password       = Column(Unicode(60), nullable=False)

#    unconfirmed = 0
#    confirmed   = 1
#    invited     = 2

    #########################################################
    # Hashing the password ####################################
    def _get_password(self):                         ####   ####
        return self._password                       # ## #  ####
    def _set_password(self, password):               ####   ####
        self._password = hash_password(password)            ####
                                                            ####
    password = property(_get_password, _set_password)       ####
    password = synonym('_password', descriptor=password)    ####
    ###########################################################
    #########################################################
