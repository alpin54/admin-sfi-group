// -- libraries
import { useState, useCallback } from 'react';

const useDiscount = (formInstance) => {
  const [memberDiscountEnabled, setMemberDiscountEnabled] = useState(false);
  const [memberScheduleEnabled, setMemberScheduleEnabled] = useState(false);
  const [memberScheduleDateRange, setMemberScheduleDateRange] = useState([null, null]);
  const [memberDiscountNumber, setMemberDiscountNumber] = useState(0);
  const [memberDiscountPercentage, setMemberDiscountPercentage] = useState(0);

  const [dealerDiscountEnabled, setDealerDiscountEnabled] = useState(false);
  const [dealerScheduleEnabled, setDealerScheduleEnabled] = useState(false);
  const [dealerScheduleDateRange, setDealerScheduleDateRange] = useState([null, null]);
  const [dealerDiscountNumber, setDealerDiscountNumber] = useState(0);
  const [dealerDiscountPercentage, setDealerDiscountPercentage] = useState(0);

  const handleMemberNumberChange = useCallback(
    (value, memberPrice) => {
      if (!memberPrice || memberPrice === 0) return;

      const numValue = value || 0;
      setMemberDiscountNumber(numValue);

      const percentage = (numValue / memberPrice) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;
      setMemberDiscountPercentage(roundedPercentage);

      formInstance.setFieldsValue({
        discount_member_number: numValue,
        discount_member: roundedPercentage
      });
    },
    [formInstance]
  );

  const handleMemberPercentageChange = useCallback(
    (value, memberPrice) => {
      if (!memberPrice || memberPrice === 0) return;

      const percentValue = value || 0;
      setMemberDiscountPercentage(percentValue);

      const discountAmount = (memberPrice * percentValue) / 100;
      const roundedAmount = Math.round(discountAmount);
      setMemberDiscountNumber(roundedAmount);

      formInstance.setFieldsValue({
        discount_member_number: roundedAmount,
        discount_member: percentValue
      });
    },
    [formInstance]
  );

  const handleDealerNumberChange = useCallback(
    (value, dealerPrice) => {
      if (!dealerPrice || dealerPrice === 0) return;

      const numValue = value || 0;
      setDealerDiscountNumber(numValue);

      const percentage = (numValue / dealerPrice) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;
      setDealerDiscountPercentage(roundedPercentage);

      formInstance.setFieldsValue({
        discount_dealer_number: numValue,
        discount_dealer: roundedPercentage
      });
    },
    [formInstance]
  );

  const handleDealerPercentageChange = useCallback(
    (value, dealerPrice) => {
      if (!dealerPrice || dealerPrice === 0) return;

      const percentValue = value || 0;
      setDealerDiscountPercentage(percentValue);

      const discountAmount = (dealerPrice * percentValue) / 100;
      const roundedAmount = Math.round(discountAmount);
      setDealerDiscountNumber(roundedAmount);

      formInstance.setFieldsValue({
        discount_dealer_number: roundedAmount,
        discount_dealer: percentValue
      });
    },
    [formInstance]
  );

  const initializeFromData = useCallback((data) => {
    if (!data) return;

    setMemberDiscountEnabled(Boolean(data.is_discount_member));
    setMemberScheduleEnabled(Boolean(data.is_schedule_discount_member));
    setDealerDiscountEnabled(Boolean(data.is_discount_dealer));
    setDealerScheduleEnabled(Boolean(data.is_schedule_discount_dealer));

    if (data.discount_member_number) {
      setMemberDiscountNumber(data.discount_member_number);
      if (data.member_price > 0) {
        const percentage = (data.discount_member_number / data.member_price) * 100;
        setMemberDiscountPercentage(Math.round(percentage * 100) / 100);
      }
    }

    if (data.discount_dealer_number) {
      setDealerDiscountNumber(data.discount_dealer_number);
      if (data.dealer_price > 0) {
        const percentage = (data.discount_dealer_number / data.dealer_price) * 100;
        setDealerDiscountPercentage(Math.round(percentage * 100) / 100);
      }
    }
  }, []);

  return {
    // Member
    memberDiscountEnabled,
    setMemberDiscountEnabled,
    memberScheduleEnabled,
    setMemberScheduleEnabled,
    memberScheduleDateRange,
    setMemberScheduleDateRange,
    memberDiscountNumber,
    memberDiscountPercentage,
    handleMemberNumberChange,
    handleMemberPercentageChange,

    // Dealer
    dealerDiscountEnabled,
    setDealerDiscountEnabled,
    dealerScheduleEnabled,
    setDealerScheduleEnabled,
    dealerScheduleDateRange,
    setDealerScheduleDateRange,
    dealerDiscountNumber,
    dealerDiscountPercentage,
    handleDealerNumberChange,
    handleDealerPercentageChange,

    // Initialize
    initializeFromData
  };
};

export { useDiscount };
