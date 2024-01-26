from django.shortcuts import render,HttpResponse
from .models import User
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .sterializer import UserSerializer
# Create your views here.

from django.http import JsonResponse


@api_view(['GET'])
def View(request):

   userData = User.objects.all()
   datadisp = UserSerializer(userData, many=True)
   
    
   return Response(datadisp.data)
@api_view(['GET', 'POST', 'PUT'])
def Write(request):
    if request.method == 'POST':
        print('called in POST method')
        data = json.loads(request.body.decode("utf-8"))
        #print('data is', data)
        #print(data)
        mydata = User.objects.filter(name=data['name'],password=data['password']).values()
        
        datadisp = UserSerializer(mydata, many=True)
        print(datadisp.data)
        if mydata :
            content = {
                'found' : True,
                'profile' : datadisp.data
            }
            return JsonResponse(json.dumps(content), safe=False)
        content = {
                'found' : False
            }
        return JsonResponse(json.dumps(content), safe=False)

    if request.method == 'PUT':
        print('called in PUT method')
        data = json.loads(request.body.decode("utf-8"))
        #print(data)
        mydata = User.objects.filter(name=data['name'],password=data['password']).values()
        
        if len(mydata) > 0 :
            print(len(mydata))
            content = {
                'exists' : True,
            }
            return JsonResponse(json.dumps(content), safe=False)
        
        elif len(mydata) == 0:
            newUser = User(name= data['name'],password= data['password'], email = data['email'])
            newUser.save()
            print('written')
            content = {
                'exists': False,
                'response' : 'success'
            }
            return JsonResponse(json.dumps(content), safe=False)


