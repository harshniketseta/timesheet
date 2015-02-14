# == Schema Information
#
# Table name: permissions
#
#  id         :integer          not null, primary key
#  name       :string(100)
#  created_at :datetime
#  updated_at :datetime
#

class Permission < ActiveRecord::Base
  has_many :role_permissions
end
