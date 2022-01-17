from django.db import models

# Create your models here.
class Task(models.Model):
    id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length = 100)
    completed = models.BooleanField(default = False, blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return self.title