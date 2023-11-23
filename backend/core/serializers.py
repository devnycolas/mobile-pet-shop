from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Produto, CustomUser

class ProdutoSerializer(serializers.ModelSerializer):

    class Meta:
        # extra_kwargs = {
        #     'email': {'write_only': True}
        # }
        model = Produto
        fields = (
            'id',
            'nome',
            'preco',
            'descricao',
            'image',
            'criado',
            'modificado',
            'ativo'
        )

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username', '')
        password = data.get('password', '')

        if not username or not password:
            raise serializers.ValidationError('Username e senha são obrigatórios.')

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError('Credenciais inválidas.')

        data['user'] = user
        data['is_staff'] = user.is_staff
        return data