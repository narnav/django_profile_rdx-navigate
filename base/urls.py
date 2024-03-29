from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('test/', views.test),
    path('pri/', views.test_pri),
    path('student/', views.StudentView.as_view()),
    path('profile/<pk>', views.ProfileView.as_view()),
    path('profile/', views.ProfileView.as_view()),
     path('student/<pk>', views.StudentView.as_view()),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('reg/', views.register),
    path('token/refresh/', TokenRefreshView.as_view()),
]
