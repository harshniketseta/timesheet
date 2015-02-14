# == Schema Information
#
# Table name: roles
#
#  id         :integer          not null, primary key
#  name       :string(100)
#  created_at :datetime
#  updated_at :datetime
#

class Role < ActiveRecord::Base
  has_many :role_permissions
end
