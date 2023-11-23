from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework import status, generics, permissions
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from .models import Produto, CustomUser
from .serializers import ProdutoSerializer, CustomUserSerializer, LoginSerializer


# Create your views here.

class UserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if 'email' in request.data:
            return self.create(request, *args, **kwargs)
        else:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'isAdminUser': user.is_staff}, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


class ProdutoAPIView(APIView):
    """
    API de Produtos
    """
    def get(self, request):
        produtos = Produto.objects.all()
        serializer = ProdutoSerializer(produtos, many=True)
        return Response(serializer.data)
    
    @permission_classes([IsAdminUser])
    def post(self, request):
        # Verifica se o usuário é um staff antes de permitir a criação
        if not request.user.is_staff:
            return Response({'error': 'Você não tem permissão para criar produtos.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = ProdutoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
class ProdutoDetailAPIView(generics.RetrieveAPIView):
    """
    API para detalhes de um produto específico.
    """
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    lookup_field = 'id'  # ou 'pk', dependendo do nome do campo na sua model

@permission_classes([IsAdminUser])
class ProdutoUpdateAPIView(UpdateAPIView):
    """
    API para editar um produto específico.
    """
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    lookup_field = 'id'  # ou 'pk', dependendo do nome do campo na sua model

@permission_classes([IsAdminUser])
class ProdutoDeleteAPIView(generics.DestroyAPIView):
    """
    API para excluir um produto específico.
    """
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    lookup_field = 'id' 