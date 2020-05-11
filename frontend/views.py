from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def surveys(request):
    return render(request, 'frontend/surveys.html')