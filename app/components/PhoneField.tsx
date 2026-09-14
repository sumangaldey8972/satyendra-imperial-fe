export default function PhoneField() {
  return (
    <label>
      Phone number
      <span className="phone-input-wrap">
        <span className="phone-prefix" aria-hidden="true">+91</span>
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel-national"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          minLength={10}
          maxLength={10}
          placeholder="10-digit mobile number"
          aria-label="Indian mobile number after plus 91"
          title="Enter a valid 10-digit Indian mobile number"
        />
      </span>
    </label>
  );
}
