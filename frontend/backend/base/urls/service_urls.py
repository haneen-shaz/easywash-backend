from django.urls import path
from base.views import services_view as views

urlpatterns = [

    path('', views.getServices, name="services"),
    path('<int:id>/', views.getservice, name="service"),

   
]