from models import db, Product
from faker import Faker
import random

def seed_products():
    fake = Faker()
    db.session.query(Product).delete()
    for _ in range(100):
        product = Product(
            name=fake.word().capitalize() + " " + fake.word().capitalize(),
            category=random.choice(["Electronics", "Books", "Clothing", "Accessories"]),
            price=round(random.uniform(100, 1000), 2),
            rating=round(random.uniform(1, 5), 1)
        )
        db.session.add(product)
    db.session.commit()
    print("Added 100 mock products!")