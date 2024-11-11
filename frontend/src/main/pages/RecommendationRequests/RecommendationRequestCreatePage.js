import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RecommendationRequestForm from "main/components/RecommendationRequests/RecommendationRequestForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RecommendationRequestCreatePage({ storybook = false }) {
  const objectToAxiosParams = (recommendationRequest) => ({
    url: "/api/recommendationrequests/post",
    method: "POST",
    params: {
      requesterEmail: recommendationRequest.requesterEmail,
      professorEmail: recommendationRequest.professorEmail,
      dateNeeded: recommendationRequest.dateNeeded,
      dateRequested: recommendationRequest.dateRequested,
      explanation: recommendationRequest.explanation,
      done: recommendationRequest.done,
    },
  });

  const onSuccess = (recommendationRequest) => {
    toast(
      `New recommendationRequest Created - id: ${recommendationRequest.id} ` +
        `requesterEmail: ${recommendationRequest.requesterEmail} professorEmail: ${recommendationRequest.professorEmail} ` +
        `dateNeeded: ${recommendationRequest.dateNeeded} dateRequested: ${recommendationRequest.dateRequested} ` +
        `explanation: ${recommendationRequest.explanation} done: ${recommendationRequest.done}`,
    );
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/recommendationrequests/all"], // mutation makes this key stale so that pages relying on it reload
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess && !storybook) {
    return <Navigate to="/recommendationrequests" />;
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New RecommendationRequest</h1>
        <RecommendationRequestForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  );
}
