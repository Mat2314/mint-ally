from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    shortened_text = serializers.SerializerMethodField('get_shortened_text')
    
    def get_shortened_text(self, obj):
        character_limit = 130
        if len(obj.content) > character_limit:
            return obj.content[:character_limit] + "..."
        return obj.content
    
    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'published_date', 'status', 'shortened_text')