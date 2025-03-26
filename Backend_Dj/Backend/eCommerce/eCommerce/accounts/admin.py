from django.contrib import admin
from accounts.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import user_address


class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "name","terms_condition","is_active","is_admin"]
    # On what basis will the filter be done?(kis base par filter hoga)
    list_filter = ["is_admin","name"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": [("name","terms_condition","address")]}),
        ("Permissions", {"fields": [("is_admin", "is_active")]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            "All Fields Required",
            {
                "classes": ["wide", "extrapretty"],
                "fields": ["email", "terms_condition","address","name","password1", "password2"],
            },
        ),
    ]
    search_fields = ["email","name"]
    ordering = ["email","id"]
    filter_horizontal = []


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)
admin.site.register(user_address)



