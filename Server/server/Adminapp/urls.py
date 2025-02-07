from django.urls import path
from . import views
urlpatterns = [
    path('GetAllUsers/',views.GetAllUsers.as_view(),name='GetAllUsers'),
    path('GetUserById/<int:pk>/',views.GetUserById.as_view(),name='GetUserById'),
    path('GetAllProducts/',views.GetAllProducts.as_view(),name='GetAllProducts'),
    path('GetProductById/<int:pk>/',views.GetProductById.as_view(),name='GetProductById'),
    path('api/signup/', views.SignupView.as_view(),name="Signup"),
    path('api/login/', views.LoginView.as_view(),name="LoginView"),
    path('bookorder/', views.BookOrder.as_view(),name="bookorder"),
    path('GetAllOrders/', views.GetAllOrders.as_view(),name="GetAllOrders")
]
