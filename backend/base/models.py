from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Service(models.Model):
    # user= models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    image=models.ImageField(null=True,blank=True)
    name=models.CharField(max_length=100,null=True,blank=True)
    description=models.TextField(max_length=200,null=True,blank=True)
    rating=models.DecimalField(max_digits=7,decimal_places=2)
    numreviews=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
         return self.name

class Review(models.Model):
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    booking_date = models.DateTimeField()
     
    def __str__(self):
        return self.service


class BookAppointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    service=models.CharField(max_length=100)
    date = models.CharField(max_length=20)
    time_slot = models.CharField(max_length=10)
    payment=models.CharField(max_length=20)
    confirm=models.BooleanField(default=False)
    def __str__(self):
        return f"Booking on {self.date} at {self.time_slot}"

class AdminNotification(models.Model):
   Appointment=models.ForeignKey(BookAppointment,on_delete=models.CASCADE,null=True)

class TimeSlot(models.Model):

    time = models.CharField(max_length=25)
   