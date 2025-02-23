import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

export const InfinityScroll = ({ children, loadMore, hasMore, isLoading }) => {
  const observer = useRef();

  useEffect(() => {
    console.log('@@@@');
    const lastItem = observer.current;
    if (!lastItem || isLoading) {
      return;
    }

    const callback = entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    };

    const options = {
      rootMargin: '200px',
    };

    const observerInstance = new IntersectionObserver(callback, options);
    if (lastItem) observerInstance.observe(lastItem);

    return () => observerInstance.disconnect();
  }, [isLoading, hasMore, loadMore]);

  return (
    <>
      {children}
      {hasMore && <div ref={observer} />}
    </>
  );
};

InfinityScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
};
