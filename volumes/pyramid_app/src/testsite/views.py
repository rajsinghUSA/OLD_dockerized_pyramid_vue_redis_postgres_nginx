import pdb
import datetime
import json
from pyramid.view import view_config
from pyramid.response import Response


######################################################################
#   Index View
# perm should be 'view'
@view_config(route_name='home')
def home(request):
    print("\n\nIndex view ")
#    print "accessed by: ", request.user.username if request.user else 'unauthenticated user @', request.remote_addr
    print("on", datetime.datetime.now(), "\n\n")

#    return Response('Authenticated: {0}'.format(unauthenticated_userid(request)))
    return Response('<body><h1>Home page!</h1></body>')




@view_config(route_name='auth')
def auth(request):
    print("\nAuth view ")
    pdb.set_trace()
#    print "accessed by: ", request.user.username if request.user else 'unauthenticated user @', request.remote_addr
    print("on", datetime.datetime.now(), "\n\n")

#    return Response('Authenticated: {0}'.format(unauthenticated_userid(request)))
    return Response('<body><h1>Auth endpoint!</h1></body>')
