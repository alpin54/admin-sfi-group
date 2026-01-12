// -- components
import PagesLanding from '@components/Pages/Landing/views';

// -- data
import data from '@components/Pages/Landing/data';

const PagesLandingWidget = () => {
  const handleDelete = async (id) => {
    console.log('Delete ID:', id);
  };

  const handleSuspend = async (id, status) => {
    console.log('Suspend ID:', id, 'Status:', status);
  };

  return <PagesLanding data={data} loading={false} onDelete={handleDelete} onSuspend={handleSuspend} />;
};

export default PagesLandingWidget;
