# == Schema Information
#
# Table name: project_users
#
#  id         :integer          not null, primary key
#  project_id :integer
#  user_id    :integer
#  role_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class ProjectUser < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  belongs_to :role
end
