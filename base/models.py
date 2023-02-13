from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    bio = models.TextField(max_length=500, blank=True)
    address = models.CharField(max_length=30, blank=True)
    phone_number= models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)




# Create your models here.
class Student(models.Model):
    sName = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    age = models.IntegerField()
    active=models.BooleanField()
    createdTime=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
           return self.sName
