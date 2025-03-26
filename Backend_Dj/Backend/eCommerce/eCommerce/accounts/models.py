from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser





class user_address(models.Model):
    village_or_town=models.TextField()
    city=models.CharField(max_length=200)
    state=models.CharField(max_length=200)
    pincode=models.CharField(max_length=7)
    phone=models.CharField(max_length=12)
    


# Custom User Model
class UserManager(BaseUserManager):
    def create_user(self, email, name,terms_condition, password2=None,password=None):
        """
        Creates and saves a User with the given email, name, terms_conditions and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            terms_condition=terms_condition,
           
        )

        user.set_password(password)
        
        
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,terms_condition, password=None,password2=None):
        """
        Creates and saves a superuser with the given email, name, terms_conditions and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            terms_condition=terms_condition
        )
        user.is_admin = True
        user.save(using=self._db)
        return user



# when superuser create ask
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name=models.CharField(
        verbose_name="Name",
        max_length=50,
    )
    terms_condition=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    address=models.ForeignKey(user_address,on_delete=models.CASCADE,related_name="user_address",null=True,blank=True)
    # when create app
    created_at=models.DateTimeField(auto_now_add=True)
    # when update
    updated_at=models.DateTimeField(auto_now=True)
    
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name","terms_condition"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

