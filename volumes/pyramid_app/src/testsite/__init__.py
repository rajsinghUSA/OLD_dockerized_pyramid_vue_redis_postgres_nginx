from pyramid.config import Configurator

from sqlalchemy import engine_from_config
from testsite.models import initialize_sql
from pyramid.registry import Registry
#from pyramid_jinja2 import _get_or_build_default_environment  # ?#?#?
from pyramid.response import Response
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy

from pyramid_redis_sessions import session_factory_from_settings
#from pyramid_beaker import session_factory_from_settings
#from pyramid.session import UnencryptedCookieSessionFactoryConfig
#from pyramid_redis_sessions import session_factory_from_settings
from testsite.security import groupfinder

registry = Registry()


def hello_world(request):
    print('Incoming request')
    return Response('<body><h1>Hello World!</h1></body>')


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    initialize_sql(engine)

    session_factory = session_factory_from_settings(settings) #redis
#    session_factory = UnencryptedCookieSessionFactoryConfig('itsaseekreet')

    authn_policy = AuthTktAuthenticationPolicy(secret='s0secret',
                                               callback=groupfinder)
    authz_policy = ACLAuthorizationPolicy()

    config = Configurator(
        settings=settings,
        root_factory='testsite.security.RootFactory',
        authentication_policy=authn_policy,
        authorization_policy=authz_policy,
        session_factory=session_factory,
    )
#    jinja_env = _get_or_build_default_environment(config.registry)  # ?#?#?
    #config.set_request_factory(RequestWithUserAttribute)

    config.add_route('hello', '/')
    config.add_view(hello_world, route_name='hello')


    config.scan()
    return config.make_wsgi_app()
