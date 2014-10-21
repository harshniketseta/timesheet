module DashboardHelper

  def set_type
    type = params.fetch(:type, "active")
  end
end
