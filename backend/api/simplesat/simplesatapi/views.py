from functools import partial
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST', 'DELETE'])
def task_list(request):
    
    if(request.method == 'GET'):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.error_messages, status=400)
        
    elif request.method == 'DELETE':
        Task.objects.all().delete()
        return JsonResponse({'message':'All Task Deleted'}, status=204)

#*****************************************************************************

@csrf_exempt
@api_view(['GET', 'PUT'])
def task_detail(request,pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return JsonResponse({'message': 'Task does not exist'}, status=404)

    if request.method == 'GET' :
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        # data = JSONParser().parse(request.data)
        print(request.data)
        serializer = TaskSerializer(task , data = {'completed':request.data['completed']}, partial=True)

        if serializer.is_valid():
           serializer.save()
           return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.error_messages, status=400)
        

        
