class Task < ActiveRecord::Base
  belongs_to :project


  def self.preprocess_params(params, current_user)
    new_params = {:assignor_id => current_user.id}
    estimated_time_for_completion = 0
    params.each do |k, v|
      if k == :to_complete_hours
        estimated_time_for_completion += (v.to_i * 60)
      elsif k == :to_complete_minutes
        estimated_time_for_completion += v.to_i
      else
        new_params[k] = v
      end
    end
    new_params[:estimated_time_for_completion] = estimated_time_for_completion
    return new_params
  end
end
