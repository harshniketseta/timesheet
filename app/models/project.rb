class Project < ActiveRecord::Base

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
