from django.urls import path
from base.views import services_view as views



urlpatterns = [

    path('', views.getServices, name="services"),
    path('<int:id>/', views.getservice, name="service"),
    path('save-booking/', views.save_booking, name='save-booking'),
    path('admin/servicelist/',views.get_Services,name="serviceslist"),
    path('admin/delete/<int:service_id>/', views.delete_service, name='delete_service'),
    path('services/admin/delete/<int:notification_id>/', views.delete_notification, name='delete_notification'),
    path('admin/create/', views.create_service, name='create_service'),
    path('admin/updateservice/',views.update_service,name="service-update"),
    path('admin/bookinglist',views.get_Bookings,name='bookinglist'),
    path('admin/delete/<int:booking_id>/', views.delete_booking, name='delete_booking'),
    path('admin/notifications/',views.get_notification,name='notifications'),
    path('getsummary/<int:id>',views.get_Appointments,name='appointments'),
    path('bookings/<int:id>', views.user_booking_history, name='user_booking_history'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('timeslot/',views.get_Timeslot,name='time-slots'),

]
    


   
