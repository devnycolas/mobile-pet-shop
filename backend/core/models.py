import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from stdimage.models import StdImageField


def get_file_path(_instace, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return filename

# Create your models here.

class CustomUser(AbstractUser):
    # Adicione campos personalizados, se necessário
    imagem = StdImageField('Imagem', default='C:/projetos-django/fusion/media/padrao.jpg', upload_to=get_file_path, variations={'thumb': {'width': 480, 'height': 480, 'crop': True}})
    pass

class Base(models.Model):
    criado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True)

    class Meta:
        abstract = True

class Produto(Base):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField()
    image = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"

    def __str__(self):
        return self.nome