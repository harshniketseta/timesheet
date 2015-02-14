# == Schema Information
#
# Table name: tasks
#
#  id                            :integer          not null, primary key
#  project_id                    :integer
#  assigned_id                   :integer
#  assignor_id                   :integer
#  title                         :string(255)
#  description                   :string(255)
#  priority                      :integer
#  estimated_time_for_completion :integer
#  time_for_completion           :integer
#  state                         :integer
#  created_at                    :datetime
#  updated_at                    :datetime
#  from_date                     :datetime
#  to_date                       :datetime
#

class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :assigned, class: User
  belongs_to :assignor, class: User


  def self.preprocess_params(params)
    estimated_time_for_completion = 0
    params.each do |k, v|
      if k == :to_complete_hours
        estimated_time_for_completion += (v.to_i * 60)
      elsif k == :to_complete_minutes
        estimated_time_for_completion += v.to_i
      else
        estimated_time_for_completion = v
      end
    end
    return estimated_time_for_completion
  end
end
