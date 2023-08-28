from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response




from base.models import Service
from django.contrib.auth.models import User
from base.serializers import ServiceSerializer
from rest_framework import status


@api_view(['GET'])
def getServices(request):
    services=Service.objects.all()
    serializer=ServiceSerializer(services,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getservice(request, id):
   service=Service.objects.get(_id=id)
   serializer=ServiceSerializer(service,many=False)
   return Response(serializer.data)

