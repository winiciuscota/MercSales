# <project>/<app>/management/commands/seed.py
from django.core.management.base import (BaseCommand, )
import random
from sales.models import (Client, Product)
import logging

logger = logging.getLogger(__name__)


# python manage.py seed --mode=refresh


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""
    logger.info("Delete Address instances")
    Client.objects.all().delete()
    Product.objects.all().delete()


def create_clients():
    """Create clients"""
    logger.info("Creating clients")
    client_names = ['Darth​ ​Vader',
                    'Obi-Wan​ ​Kenobi',
                    'Luke​ ​Skywalker',
                    'Imperador​ ​Palpatine',
                    'Han​ ​Solo']

    clients = [Client(name=name) for name in client_names]

    Client.objects.bulk_create(clients)
    logger.info("List of clients created: {}".format(client_names))
    return clients


def create_products():
    """Create products"""
    logger.info("Creating clients")
    products_info = [
        ('Millenium​ ​Falcon', 550000),
        ('X-Wing', 60000, 2),
        ('Super​ ​Star​ ​Destroyer', 4570000),
        ('TIE​ ​Fighter', 750, 2),
        ('Lightsaber', 60, 5),
        ('DLT-19​ ​Heavy​ ​Blaster​ ​Rifle', 5800),
        ('DL-44​ ​Heavy​ ​Blaster​ ​Pistol', 1500, 10)
    ]

    products = [Product(name=info[0], unit_price=info[1], multiple=info[2] if len(info) > 2 else None)
                for info in products_info]

    Product.objects.bulk_create(products)
    logger.info("List of products created: {}".format(products_info))
    return products


def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    clear_data()
    create_clients()
    create_products()
