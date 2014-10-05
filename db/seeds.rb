# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# ROLE SEED DATA.
Role.create([
                {:name => "Developer"},
                {:name => "Senior Developer"},
                {:name => "Lead Developer"},
                {:name => "Technical Architect"},
                {:name => "UX Specialist"},
                {:name => "Lead UX Specialist"},
                {:name => "Project Admin"},
                {:name => "Bussiness Analyst"},
                {:name => "CEO"},
                {:name => "CTO"},
                {:name => "Project Coordinator"},
                {:name => "Happiness Officer"},
            ])

Permission.create([
                {:name => "Add Project"},
                {:name => "Edit Project"},
                {:name => "Add Members"},
                {:name => "Remove Members"},
            ])
