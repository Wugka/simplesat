from django.urls import path
from . import views

urlpatterns = [
    path('api/tasks', views.task_list),
    path('api/tasks/<int:pk>', views.task_detail)
]