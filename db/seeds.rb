# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


ROLE SEED DATA.
Role.destroy_all
ceo = Role.create(:name => "CEO")
coo = Role.create(:name => "COO")
cto = Role.create(:name => "CTO")
die = Role.create(:name => "Director of Engineering")
hr = Role.create(:name => "Happiness Officer")
tech_arch = Role.create(:name => "Technical Architect")
project_admin = Role.create(:name => "Project Admin")
project_co = Role.create(:name => "Project Coordinator")
ba = Role.create(:name => "Business Analyst")
lead_dev = Role.create(:name => "Lead Developer")
sen_dev = Role.create(:name => "Senior Developer")
dev = Role.create(:name => "Developer")
lead_ux = Role.create(:name => "Lead UX Specialist")
ux = Role.create(:name => "UX Specialist")


Permission.destroy_all
invite_user = Permission.create(:name => "Invite User")
delete_user = Permission.create(:name => "Delete User")
add_project = Permission.create(:name => "Add Project")
edit_project = Permission.create(:name => "Edit Project")
add_member = Permission.create(:name => "Add Member")
remove_member = Permission.create(:name => "Remove Member")

RolePermission.destroy_all
RolePermission.create([
                          {:role => ceo, :permission => invite_user},
                          {:role => ceo, :permission => delete_user},
                          {:role => ceo, :permission => add_project},
                          {:role => ceo, :permission => edit_project},
                          {:role => ceo, :permission => add_member},
                          {:role => ceo, :permission => remove_member}
                      ])



# u1 = User.create("email"=>"harshniket+1@idyllic-software.com",
#             "created_at"=>"Fri, 03 Oct 2014 20:52:17 UTC +00:00",
#             "updated_at"=>"Sat, 13 Dec 2014 14:22:41 UTC +00:00",
#             "name"=>"Harsh1",
#             "provider"=>"google_oauth2",
#             "uid"=>"103784627835026168434",
#             "username"=>"Harsh1",
#             "avatar"=>"https://lh4.googleusercontent.com/-WD61OSGm-X4/AAAAAAAAAAI/AAAAAAAAABM/OIAjF1ZAYzo/photo.jpg?sz=50")
#
# u1.password = "12345678"
# u1.save!
#
# u2 = User.create("email"=>"harshniket+2@idyllic-software.com",
#             "created_at"=>"Fri, 03 Oct 2014 20:52:17 UTC +00:00",
#             "updated_at"=>"Sat, 13 Dec 2014 14:22:41 UTC +00:00",
#             "name"=>"Harsh2",
#             "provider"=>"google_oauth2",
#             "uid"=>"103784627835026168434",
#             "username"=>"Harsh2",
#             "avatar"=>"https://lh4.googleusercontent.com/-WD61OSGm-X4/AAAAAAAAAAI/AAAAAAAAABM/OIAjF1ZAYzo/photo.jpg?sz=50")
# u2.password = "12345678"
# u2.save!
#
# u3 = User.create("email"=>"harshniket+3@idyllic-software.com",
#             "created_at"=>"Fri, 03 Oct 2014 20:52:17 UTC +00:00",
#             "updated_at"=>"Sat, 13 Dec 2014 14:22:41 UTC +00:00",
#             "name"=>"Harsh3",
#             "provider"=>"google_oauth2",
#             "uid"=>"103784627835026168434",
#             "username"=>"Harsh3",
#             "avatar"=>"https://lh4.googleusercontent.com/-WD61OSGm-X4/AAAAAAAAAAI/AAAAAAAAABM/OIAjF1ZAYzo/photo.jpg?sz=50")
#
# u3.password = "12345678"
# u3.save!
