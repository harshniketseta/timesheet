# == Schema Information
#
# Table name: projects
#
#  id                :integer          not null, primary key
#  name              :string(40)
#  parent_project_id :integer
#  created_at        :datetime
#  updated_at        :datetime
#  description       :string(255)
#  trashed           :boolean
#

class Project < ActiveRecord::Base
  has_many :members, class: ProjectUser
  has_many :tasks

  default_scope { where(:trashed => false) }

  def destroy
    self.trashed = true
    self.save!
  end

  def undestroy!
    self.trashed = false
    self.save!
  end
end
