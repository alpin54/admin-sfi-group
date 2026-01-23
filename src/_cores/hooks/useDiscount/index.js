import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

const useDiscount = (formInstance) => {
  // Member
  const [memberDiscountEnabled, setMemberDiscountEnabled] = useState(false);
  const [memberScheduleEnabled, setMemberScheduleEnabled] = useState(false);
  const [memberScheduleDateRange, setMemberScheduleDateRange] = useState([null, null]);
  const [memberDiscountNumber, setMemberDiscountNumber] = useState(0);
  const [memberDiscountPercentage, setMemberDiscountPercentage] = useState(0);

  // Dealer
  const [dealerDiscountEnabled, setDealerDiscountEnabled] = useState(false);
  const [dealerScheduleEnabled, setDealerScheduleEnabled] = useState(false);
  const [dealerScheduleDateRange, setDealerScheduleDateRange] = useState([null, null]);
  const [dealerDiscountNumber, setDealerDiscountNumber] = useState(0);
  const [dealerDiscountPercentage, setDealerDiscountPercentage] = useState(0);

  // --- HANDLER (nominal dan persentase selalu sinkron dua arah) ---
  const handleMemberNumberChange = useCallback(
    (value, memberPrice) => {
      const numValue = Number(value) || 0;
      setMemberDiscountNumber(numValue);

      let percentage = 0;
      if (memberPrice > 0) percentage = Math.round((numValue / memberPrice) * 10000) / 100;
      setMemberDiscountPercentage(percentage);

      formInstance.setFieldsValue({
        discount_member_number: numValue,
        discount_member: percentage
      });
    },
    [formInstance]
  );

  const handleMemberPercentageChange = useCallback(
    (value, memberPrice) => {
      const percentValue = Number(value) || 0;
      setMemberDiscountPercentage(percentValue);

      let discountAmount = 0;
      if (memberPrice > 0) discountAmount = Math.round((memberPrice * percentValue) / 100);
      setMemberDiscountNumber(discountAmount);

      formInstance.setFieldsValue({
        discount_member_number: discountAmount,
        discount_member: percentValue
      });
    },
    [formInstance]
  );

  const handleDealerNumberChange = useCallback(
    (value, dealerPrice) => {
      const numValue = Number(value) || 0;
      setDealerDiscountNumber(numValue);

      let percentage = 0;
      if (dealerPrice > 0) percentage = Math.round((numValue / dealerPrice) * 10000) / 100;
      setDealerDiscountPercentage(percentage);

      formInstance.setFieldsValue({
        discount_dealer_number: numValue,
        discount_dealer: percentage
      });
    },
    [formInstance]
  );

  const handleDealerPercentageChange = useCallback(
    (value, dealerPrice) => {
      const percentValue = Number(value) || 0;
      setDealerDiscountPercentage(percentValue);

      let discountAmount = 0;
      if (dealerPrice > 0) discountAmount = Math.round((dealerPrice * percentValue) / 100);
      setDealerDiscountNumber(discountAmount);

      formInstance.setFieldsValue({
        discount_dealer_number: discountAmount,
        discount_dealer: percentValue
      });
    },
    [formInstance]
  );

  // --- INISIALISASI dari DATA API (mapping lengkap sesuai API-mu) ---
  const initializeFromData = useCallback(
    (data = {}) => {
      // Member discount
      setMemberDiscountEnabled(Boolean(data.is_discount_member));
      setMemberScheduleEnabled(Boolean(data.is_schedule_discount_member));
      const memberPercentage = Number(data.discount_member) || 0;
      setMemberDiscountPercentage(memberPercentage);
      const memberPrice = Number(data.member_price) || 0;
      const memberNumber = memberPrice > 0 ? Math.round((memberPrice * memberPercentage) / 100) : 0;
      setMemberDiscountNumber(memberNumber);

      let memberScheduleRange = [null, null];
      if (data.discount_member_start && data.discount_member_end) {
        memberScheduleRange = [dayjs(data.discount_member_start), dayjs(data.discount_member_end)];
        setMemberScheduleDateRange(memberScheduleRange);
      } else {
        setMemberScheduleDateRange([null, null]);
      }

      // Dealer discount
      setDealerDiscountEnabled(Boolean(data.is_discount_dealer));
      setDealerScheduleEnabled(Boolean(data.is_schedule_discount_dealer));
      const dealerPercentage = Number(data.discount_dealer) || 0;
      setDealerDiscountPercentage(dealerPercentage);
      const dealerPrice = Number(data.dealer_price) || 0;
      const dealerNumber = dealerPrice > 0 ? Math.round((dealerPrice * dealerPercentage) / 100) : 0;
      setDealerDiscountNumber(dealerNumber);

      let dealerScheduleRange = [null, null];
      if (data.discount_dealer_start && data.discount_dealer_end) {
        dealerScheduleRange = [dayjs(data.discount_dealer_start), dayjs(data.discount_dealer_end)];
        setDealerScheduleDateRange(dealerScheduleRange);
      } else {
        setDealerScheduleDateRange([null, null]);
      }

      // Set to Ant Design Form
      formInstance?.setFieldsValue({
        // MEMBER
        discount_member: memberPercentage,
        discount_member_number: memberNumber,
        discount_member_schedule: memberScheduleRange,
        // DEALER
        discount_dealer: dealerPercentage,
        discount_dealer_number: dealerNumber,
        discount_dealer_schedule: dealerScheduleRange
      });
    },
    [formInstance]
  );

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

    // Utils
    initializeFromData
  };
};

export { useDiscount };
