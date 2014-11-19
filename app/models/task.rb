class Task < ActiveRecord::Base
  belongs_to :project


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
