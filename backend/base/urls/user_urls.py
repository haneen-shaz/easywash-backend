from django.urls import path
from base.views import users_view as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    
    path('', views.getUsers, name="users"),
    path('admin/userslist/',views.getUsers,name="userslist"),
    path('admin/delete/<int:user_id>/', views.delete_user, name='delete_user'),
    

]