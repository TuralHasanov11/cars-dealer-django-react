# Generated by Django 4.1.1 on 2022-09-21 16:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Brand",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Car",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "made_at",
                    models.IntegerField(
                        choices=[
                            (1984, 1984),
                            (1985, 1985),
                            (1986, 1986),
                            (1987, 1987),
                            (1988, 1988),
                            (1989, 1989),
                            (1990, 1990),
                            (1991, 1991),
                            (1992, 1992),
                            (1993, 1993),
                            (1994, 1994),
                            (1995, 1995),
                            (1996, 1996),
                            (1997, 1997),
                            (1998, 1998),
                            (1999, 1999),
                            (2000, 2000),
                            (2001, 2001),
                            (2002, 2002),
                            (2003, 2003),
                            (2004, 2004),
                            (2005, 2005),
                            (2006, 2006),
                            (2007, 2007),
                            (2008, 2008),
                            (2009, 2009),
                            (2010, 2010),
                            (2011, 2011),
                            (2012, 2012),
                            (2013, 2013),
                            (2014, 2014),
                            (2015, 2015),
                            (2016, 2016),
                            (2017, 2017),
                            (2018, 2018),
                            (2019, 2019),
                            (2020, 2020),
                            (2021, 2021),
                            (2022, 2022),
                        ],
                        default=2022,
                        verbose_name="year",
                    ),
                ),
                (
                    "currency",
                    models.CharField(
                        choices=[("azn", "AZN"), ("usd", "USD"), ("eur", "EUR")],
                        default="azn",
                        max_length=3,
                    ),
                ),
                (
                    "price",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(500)]
                    ),
                ),
                ("distance", models.IntegerField(default=0)),
                ("is_active", models.BooleanField(default=False)),
                ("barter", models.BooleanField(default=False)),
                ("credit", models.BooleanField(default=False)),
                ("description", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            managers=[("cars", django.db.models.manager.Manager()),],
        ),
        migrations.CreateModel(
            name="CarBody",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Car Body", "verbose_name_plural": "Car Bodies",},
        ),
        migrations.CreateModel(
            name="City",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "City", "verbose_name_plural": "Cities",},
        ),
        migrations.CreateModel(
            name="Color",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Color", "verbose_name_plural": "Colors",},
        ),
        migrations.CreateModel(
            name="Engine",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("volume", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Engine", "verbose_name_plural": "Engines",},
        ),
        migrations.CreateModel(
            name="Equipment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Equipment", "verbose_name_plural": "Equipment",},
        ),
        migrations.CreateModel(
            name="Fuel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Fuel", "verbose_name_plural": "Fuels",},
        ),
        migrations.CreateModel(
            name="GearLever",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Gear Lever",
                "verbose_name_plural": "Gear Levers",
            },
        ),
        migrations.CreateModel(
            name="Transmission",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Transmission",
                "verbose_name_plural": "Transmissions",
            },
        ),
        migrations.CreateModel(
            name="CarModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "brand",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="brand",
                        to="cars.brand",
                    ),
                ),
            ],
            options={
                "verbose_name": "Car Brand Model",
                "verbose_name_plural": "Car Brand Models",
            },
        ),
        migrations.CreateModel(
            name="CarImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="media/cars")),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("front", "Front View"),
                            ("back", "Back View"),
                            ("panel", "Front Panel View"),
                            ("other", "Others"),
                        ],
                        default="front",
                        max_length=20,
                    ),
                ),
                (
                    "car",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="car_images",
                        to="cars.car",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="car",
            name="car_body",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="car_body",
                to="cars.carbody",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="car_model",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="car_model",
                to="cars.carmodel",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="city",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="city",
                to="cars.city",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="color",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="color",
                to="cars.color",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="engine",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="engine",
                to="cars.engine",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="equipment",
            field=models.ManyToManyField(
                related_name="car_equipment", to="cars.equipment"
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="fuel",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="fuel",
                to="cars.fuel",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="gear_lever",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="gear_lever",
                to="cars.gearlever",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="transmission",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="transmission",
                to="cars.transmission",
            ),
        ),
        migrations.AddField(
            model_name="car",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]