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
