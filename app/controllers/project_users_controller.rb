class ProjectUsersController < ApplicationController

  def create
    begin
      ProjectUser.create(project_users_params)
      redirect_to request.referrer, :notice => "User added to project."
    rescue StandardError => e
      redirect_to request.referrer, :alert => [e.message]
    end
  end

  private

  def project_users_params
    params[:project_user].present? ? params.require(:project_user).permit([:project_id, :user_id, :role_id]) : {}
  end
end
