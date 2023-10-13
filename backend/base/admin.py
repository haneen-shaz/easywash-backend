from django.contrib import admin
from .models import Service,Review,Booking,BookAppointment,AdminNotification,TimeSlot



# Register your models here.
admin.site.register(Service)
admin.site.register(Review)
admin.site.register(Booking)
admin.site.register(BookAppointment)
admin.site.register(AdminNotification)
admin.site.register(TimeSlot)