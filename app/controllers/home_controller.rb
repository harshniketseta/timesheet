class HomeController < ApplicationController

  def index
    if current_user.present?
      redirect_to project_path
    end
  end

end
