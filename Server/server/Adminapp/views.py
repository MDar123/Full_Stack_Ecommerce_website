from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from .models import Product,Order
from .serializers import ProductSerializer,CreateOrderSerializer,OrderSerializer
from django.contrib.auth.models import User
from rest_framework import generics,status
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate
class GetAllProducts(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class GetProductById(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    def create(self, request):
        username = request.data.get('username')
        email =  request.data.get('email')
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():
            return Response({"message":"This Email Already Exits , Try Logging in"},status=409)
        
        user = User.objects.create_user(
            username = username,
            email=email,
            password=password,
            )
        

        return Response({
            "message":"User created successfully",
            'user':{
                "username":user.username,
                "email":user.email,
                "password":password
            }
        },status=201)         

class LoginView(generics.GenericAPIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # User authenticated, return user details
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

class GetAllUsers(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserById(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BookOrder(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

    def create(self, request):
        data = request.data
        username = data.get('username')  # Username from frontend/localStorage
        product_ids = data.get('products')  # Array of product IDs
        total_price = data.get('total_price')  # Total price
        print(data)

        try:
            # Validate products
            products = Product.objects.filter(id__in=product_ids)
            if not products.exists():
                return Response({'error': 'Invalid product IDs'}, status=status.HTTP_400_BAD_REQUEST)

            # Create order with username
            order = Order.objects.create(username=username, total_price=total_price)
            order.products.set(products)  # Assign products to the order
            order.save()

            return Response({'message': 'Order placed successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class GetAllOrders(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer