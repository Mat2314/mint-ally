from django.core.management.base import BaseCommand, CommandError
from apps.blog.models import Article
import datetime

class Command(BaseCommand):
    help = 'Seeds blog articles'

    def handle(self, *args, **options):
        try:
            ARTICLES_AMOUNT = 30
            ARTICLE_CONTENT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt quam rutrum massa ullamcorper tincidunt. Suspendisse consectetur luctus ipsum, at porta sapien eleifend a. Sed ut fermentum ligula. Nulla felis sem, dictum semper dolor sed, consectetur aliquam ligula. Aliquam condimentum mauris quis risus pretium volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In volutpat faucibus mollis. Donec ut metus id neque ullamcorper commodo. \
                \nVivamus maximus interdum ipsum sit amet sodales. Nam aliquet tellus vitae lacinia posuere. Etiam a pulvinar sapien, et egestas augue. Vivamus dignissim dictum mauris, nec aliquam lacus aliquam eget. Donec tincidunt lacus risus, ut elementum libero consequat eu. Integer volutpat magna at velit auctor finibus. Etiam bibendum tempus magna vitae sagittis. Nullam sed lacus vehicula, dignissim libero quis, egestas mauris. Quisque eget nisl in nibh sodales facilisis ut non augue. Pellentesque vitae lorem sit amet tellus tristique pharetra et ut lacus. Suspendisse potenti. Etiam arcu augue, lobortis vitae eros quis, facilisis vulputate neque. Pellentesque ligula leo, elementum non erat lobortis, pulvinar sodales nibh. Nam nulla erat, porta sit amet mollis at, congue at sem. Sed a ornare ipsum, sit amet rhoncus est. \
                \nSed sagittis est in sem iaculis efficitur. Proin in luctus est. Praesent laoreet nunc sit amet tortor vehicula, a aliquam lectus feugiat. Nam non feugiat est. Quisque condimentum justo euismod erat vestibulum ultricies. Nulla semper metus nec est ullamcorper pulvinar. Vestibulum volutpat lacinia rhoncus. Phasellus rutrum nibh vitae odio posuere, quis scelerisque arcu dignissim. Aliquam vitae aliquet orci, ut porttitor eros. Duis commodo blandit interdum. Curabitur id massa ut mauris suscipit porta ut at enim. Donec convallis dolor a efficitur dapibus. Nulla maximus laoreet suscipit. Quisque ac aliquet risus, ut interdum erat. Duis elementum pellentesque augue at efficitur."
            
            for i in range(ARTICLES_AMOUNT):
                Article.objects.create(
                    title = f"Article_{i}",
                    content = ARTICLE_CONTENT,
                    published_date = datetime.datetime.now(),
                    status = "published",
                )
            
            self.stdout.write(self.style.SUCCESS(f"Populated database with {ARTICLES_AMOUNT} articles!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR("Could not populate database with notifications"))
            print(e)
