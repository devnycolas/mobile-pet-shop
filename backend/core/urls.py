from django.urls import path
from .views import ProdutoAPIView, ProdutoDetailAPIView, ProdutoUpdateAPIView, ProdutoDeleteAPIView, UserListView, UserDetailView

urlpatterns = [
    path('produtos/', ProdutoAPIView.as_view(), name="produtos"),
    path('produto/<int:id>/', ProdutoDetailAPIView.as_view(), name="produto_detail"),
    path('produto/editar/<int:id>/', ProdutoUpdateAPIView.as_view(), name="produto_update"),
    path('produto/excluir/<int:id>/', ProdutoDeleteAPIView.as_view(), name="produto_delete"),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('cadastro-usuario/', UserListView.as_view(), name='user-list'),
    path('login/', UserListView.as_view(), name='user-list'),
]