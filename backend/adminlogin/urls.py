from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('adminlogin/', MyTokenObtainPairView.as_view(), name='Token_obtai_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='Token_refresh'),
    ]