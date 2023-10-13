from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
import datetime
from datetime import datetime as datetimes
from datetime import  timedelta


from rest_framework import generics




from base.models import Service,BookAppointment,AdminNotification,TimeSlot
from django.contrib.auth.models import User
from base.serializers import ServiceSerializer,AppointmentSerializer,NotificationSerializer,UserProfileSerializer
from rest_framework import status


@api_view(['GET'])
def getServices(request):
    query = request.query_params.get('keyword')
    print("query:", query)
    if query is None:
        query = ''
    services = Service.objects.filter(name__icontains=query)
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getservice(request, id):
   service=Service.objects.get(_id=id)
   serializer=ServiceSerializer(service,many=False)
   return Response(serializer.data)



@api_view(['POST'])
def save_booking(request):
    booking_data = request.data
    print(booking_data)
    user=User.objects.get(id=booking_data['user'])
    service=Service.objects.get(name=booking_data['name'])

    date=booking_data['date']
    date=str(date)
    input_datetime = datetimes.fromisoformat(date[:-1])

    formatted_date = input_datetime.strftime("%Y-%m-%d")
    d_list=formatted_date.split("-")
    d_list[2]=int(d_list[2])+1
    formatted_date=str(d_list[0])+"-"+str(d_list[1])+"-"+str(d_list[2])
    
    new_booking = BookAppointment.objects.create(
            date=formatted_date,
            time_slot=booking_data['timeSlot'],
            service=service,
            payment=booking_data['price'],
            user=user,
 
        )
    date=formatted_date
    time_slot=booking_data['timeSlot']
    service=service
    booking=BookAppointment.objects.get(id=new_booking.id)
    notification=AdminNotification.objects.create(Appointment=booking)
    notification.save()
    recipient = user.email
    subject = 'Booking confirmation details'
    message = f'Booking confirmed for {service} at {time_slot} on {date} '
    send_mail(subject, message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)
    return Response({'message': 'Booking saved successfully','id':new_booking.id})
    
    
@api_view(['GET'])
def get_Services(request):
    services=Service.objects.all()
    serializer=ServiceSerializer(services,many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_service(request, service_id):
    try:
        service = Service.objects.get(pk=service_id)
        service.delete()
        return Response({'message': 'Service deleted successfully'})
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def create_service(request):
    data=request.data  
    service = Service.objects.create(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            rating=data['rating'],
            image=data['image']   
        )
    serializer = ServiceSerializer(service,many=False)
    print(serializer)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_Bookings(request):
    bookings=BookAppointment.objects.all()
    serializer=AppointmentSerializer(bookings,many=True)
    return Response(serializer.data)
@api_view(['DELETE'])
def delete_booking(request, booking_id):
    try:
        booking = BookAppointment.objects.get(pk=booking_id)
        booking.delete()
        return Response({'message': 'booking deleted successfully'})
    except BookAppointment.DoesNotExist:
        return Response({'error': 'booking not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    print("delete")
@api_view(['GET']) 
def get_notification(request):
    notification=AdminNotification.objects.all()
    print(notification)
    serializer=NotificationSerializer(notification,many=True)
    print(serializer)
    return Response(serializer.data)

@api_view(['GET'])
def get_Appointments(request,id):
    appointments=BookAppointment.objects.get(id=id)
    print(appointments.payment)
    serializer=AppointmentSerializer(appointments,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def user_booking_history(request,id):
   
    user=User.objects.get(id=id)
    print(id)
    bookings = BookAppointment.objects.filter(user=user)
    serializer = AppointmentSerializer(bookings, many=True)
    return Response(serializer.data)

def updateOrderToPaid(request, pk):
    booking = BookAppointment.objects.get(_id=pk)
    booking.isPaid = True
    booking.paidAt = datetime.now()
    booking.save()
    print(booking)

    return Response('Order was paid')

@api_view(['GET'])
def get_Timeslot(request):
    selected_date = request.query_params.get('date')
    date=str(selected_date)
    input_datetime = datetimes.fromisoformat(date[:-1])
    
    formatted_date = input_datetime.strftime("%Y-%m-%d")
    d_list=formatted_date.split("-")
    d_list[2]=int(d_list[2])+1
    formatted_date=str(d_list[0])+"-"+str(d_list[1])+"-"+str(d_list[2])
    booked_data=BookAppointment.objects.filter(date=formatted_date)
    booked_list=[]
  
    if booked_data:
        for i in booked_data:
            booked_list.append(i.time_slot)
    time=TimeSlot.objects.all()
    time_list=[]
    for i in time:
        if i.time not in booked_list:
            time_list.append(i.time)
    
    return Response({'times':time_list})
 
@api_view(['PUT'])
def update_service(request, id):
    try:
        service = Service.objects.get(pk=id)
        print(service)
    except Service.DoesNotExist:
        return Response({"message": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_notification(request, notification_id):
    notification = get_object_or_404(AdminNotification, id=notification_id)
    notification.delete()
    return Response({'message': 'Notification deleted successfully'})
@api_view(['GET'])
def search_service(request):
    queryset=Service.objects.all()
    serializer=ServiceSerializer(queryset,many=True)
   
